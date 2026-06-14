import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function GLTFHuman({ url, ...props }){
  const gltf = useLoader(GLTFLoader, url)
  const ref = useRef()
  const { camera } = useThree()

  useEffect(()=>{
    if(!gltf || !gltf.scene) return
    // primary holographic material
    // collect meshes first to avoid re-traversing newly-added rim meshes
    const meshes = []
    gltf.scene.traverse((c)=>{
      if(c.isMesh) meshes.push(c)
    })

    meshes.forEach((c)=>{
      const baseMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00e5ff'),
        emissive: new THREE.Color('#00b8ff'),
        emissiveIntensity: 1.6,
        transparent: true,
        opacity: 0.28,
        metalness: 0.1,
        roughness: 0.18,
      })
      baseMat.depthWrite = false
      baseMat.depthTest = true
      c.material = baseMat
      c.renderOrder = 2

      // add a thin fresnel rim/glow shell as a child mesh
      try{
        const rimUniforms = {
          uColor: { value: new THREE.Color('#66f0ff') },
          uIntensity: { value: 1.4 },
          uPower: { value: 1.8 }
        }
        const rimMat = new THREE.ShaderMaterial({
          uniforms: rimUniforms,
          vertexShader: `varying vec3 vNormal; varying vec3 vView; void main(){ vNormal = normalize(normalMatrix * normal); vec4 mvPos = modelViewMatrix * vec4(position,1.0); vView = -mvPos.xyz; gl_Position = projectionMatrix * mvPos; }`,
          fragmentShader: `uniform vec3 uColor; uniform float uIntensity; uniform float uPower; varying vec3 vNormal; varying vec3 vView; void main(){ float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), normalize(vView))), uPower); vec3 col = uColor * fresnel * uIntensity; gl_FragColor = vec4(col, fresnel * 0.95); }`,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.FrontSide
        })
        const rimMesh = new THREE.Mesh(c.geometry, rimMat)
        rimMesh.scale.set(1.02,1.02,1.02)
        rimMesh.renderOrder = 3
        rimMesh.frustumCulled = false
        c.add(rimMesh)
      }catch(e){ /* shader might fail in some contexts */ }
    })

    // Auto-scale and center the model to fit inside the card viewport
    try{
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const size = box.getSize(new THREE.Vector3())
      const desiredHeight = 1.2 // world units target height for the model (smaller to fit card)
      let scaleFactor = 1
      if(size.y > 0){
        scaleFactor = desiredHeight / size.y
      }
      // clamp to avoid extreme scaling
      scaleFactor = Math.max(0.3, Math.min(scaleFactor, 2.0))
      if(ref.current){
        ref.current.scale.setScalar(scaleFactor)
          // recompute bbox after scaling
          const box2 = new THREE.Box3().setFromObject(ref.current)
          const minY = box2.min.y
          // raise model so feet sit slightly above origin (so it appears centered in card)
          ref.current.position.y = ref.current.position.y - minY + 0.05
          // now center the model's midpoint to a target center so body isn't foot-focused
          const center = box2.getCenter(new THREE.Vector3())
          const targetCenterY = 1.2 // lower target center so the full body (head to feet) is balanced
          const delta = targetCenterY - center.y
          ref.current.position.y += delta
      }
    }catch(e){
      // ignore errors
    }
    // If caller passed an explicit scale prop, override auto-scaling and center accordingly
    if(ref.current && props.scale){
      try{
        const userScale = props.scale
        if(Array.isArray(userScale)) ref.current.scale.set(userScale[0], userScale[1], userScale[2])
        else if(typeof userScale === 'number') ref.current.scale.setScalar(userScale)
        const box2 = new THREE.Box3().setFromObject(ref.current)
        const center = box2.getCenter(new THREE.Vector3())
        const targetCenterY = 1.6
        const delta = targetCenterY - center.y
        ref.current.position.y += delta
      }catch(e){}
      // after applying user scale/position, attempt to frame the model
      try{
        const box = new THREE.Box3().setFromObject(ref.current)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        // compute distance to fit model based on camera fov
        const fov = camera.fov || 45
        const aspect = camera.aspect || 1
        const maxDim = Math.max(size.x, size.y, size.z)
        const distance = Math.abs(maxDim / (2 * Math.tan((fov * Math.PI) / 180 / 2)))
        camera.position.set(center.x, center.y + (size.y * 0.35), center.z + distance * 1.05)
        camera.lookAt(center)
        // notify parent that model loaded and provide bbox info
        if(props.onLoaded){
          props.onLoaded({ object: ref.current, box, size, center })
        }
      }catch(e){}
    }
  }, [gltf])

  useFrame((_,dt)=>{
    if(ref.current) ref.current.rotation.y += dt * 0.18
  })

  // (removed automatic 'feet to origin' adjuster to avoid foot-dominant framing)

  return <primitive ref={ref} object={gltf.scene} {...props} />
}

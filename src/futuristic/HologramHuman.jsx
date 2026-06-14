import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import GLTFHuman from './GLTFHuman'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function RotatingGroup({ children }){
  const ref = useRef()
  useFrame((_, delta) => { if(ref.current) ref.current.rotation.y += delta * 0.25 })
  return <group ref={ref}>{children}</group>
}

function PulsingHeart({position=[0,1.0,0]}){
  const ref = useRef()
  useFrame((s,dt)=>{
    const t = s.clock.getElapsedTime()
    if(ref.current){
      const s = 1 + Math.sin(t*3.2)*0.06
      ref.current.scale.set(s,s,s)
      ref.current.material.emissiveIntensity = 1 + Math.sin(t*3.2)*0.6
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.12,32,32]} />
      <meshStandardMaterial color={'#ff6b6b'} emissive={'#ff4d6d'} metalness={0.2} roughness={0.2} transparent opacity={0.95} />
    </mesh>
  )
}

function WireframeShell({geometry, color='#00e5ff'}){
  const linesRef = useRef()
  const edges = useMemo(()=> new THREE.EdgesGeometry(geometry), [geometry])
  return (
    <lineSegments geometry={edges} ref={linesRef}>
      <lineBasicMaterial attach='material' color={color} linewidth={1} transparent opacity={0.85} />
    </lineSegments>
  )
}

function Humanoid(){
  // reusable geometries
  const headGeo = useMemo(()=> new THREE.SphereGeometry(0.28,32,32), [])
  const torsoGeo = useMemo(()=> new THREE.CylinderGeometry(0.52,0.7,1.05,32), [])
  const limbGeo = useMemo(()=> new THREE.CylinderGeometry(0.12,0.12,0.9,24), [])

  return (
    <RotatingGroup>
      {/* translucent outer shell */}
      <mesh position={[0,1.6,0]} geometry={headGeo}>
        <meshStandardMaterial color={'#00e5ff'} emissive={'#009bb3'} emissiveIntensity={0.35} transparent opacity={0.18} metalness={0.1} roughness={0.2} />
      </mesh>

      <mesh position={[0,0.6,0]} geometry={torsoGeo}>
        <meshStandardMaterial color={'#66f0ff'} emissive={'#007fb3'} emissiveIntensity={0.18} transparent opacity={0.12} metalness={0.05} roughness={0.25} />
      </mesh>

      <mesh position={[-0.9,0.8,0]} geometry={limbGeo} rotation={[0,0,0.4]}>
        <meshStandardMaterial color={'#00e5ff'} emissive={'#00e5ff'} emissiveIntensity={0.12} transparent opacity={0.14} />
      </mesh>
      <mesh position={[0.9,0.8,0]} geometry={limbGeo} rotation={[0,0,-0.4]}>
        <meshStandardMaterial color={'#00e5ff'} emissive={'#00e5ff'} emissiveIntensity={0.12} transparent opacity={0.14} />
      </mesh>
      <mesh position={[-0.28,-0.9,0]} geometry={new THREE.CylinderGeometry(0.16,0.16,1.2,24)}>
        <meshStandardMaterial color={'#66f0ff'} emissive={'#00a8d4'} emissiveIntensity={0.08} transparent opacity={0.14} />
      </mesh>
      <mesh position={[0.28,-0.9,0]} geometry={new THREE.CylinderGeometry(0.16,0.16,1.2,24)}>
        <meshStandardMaterial color={'#66f0ff'} emissive={'#00a8d4'} emissiveIntensity={0.08} transparent opacity={0.14} />
      </mesh>

      {/* wireframe layer for neon outline */}
      <group>
        <mesh position={[0,1.6,0]} geometry={headGeo} visible={false}>
          {/* placeholder to attach geometry */}
        </mesh>
        <WireframeShell geometry={headGeo} color={'#7cffc8'} />

        <mesh position={[0,0.6,0]} geometry={torsoGeo} visible={false} />
        <WireframeShell geometry={torsoGeo} color={'#00e5ff'} />

        <mesh position={[-0.9,0.8,0]} geometry={limbGeo} visible={false} />
        <WireframeShell geometry={limbGeo} color={'#7fd7ff'} />

        <mesh position={[0.9,0.8,0]} geometry={limbGeo} visible={false} />
        <WireframeShell geometry={limbGeo} color={'#7fd7ff'} />
      </group>

      {/* pulsing heart */}
      <PulsingHeart position={[0,1.05,0.08]} />
    </RotatingGroup>
  )
}

function Particles(){
  const points = useMemo(()=>{
    const arr = new Float32Array(400*3)
    for(let i=0;i<400;i++){
      const r = 1.8 + Math.random()*2.4
      const theta = Math.random()*Math.PI*2
      const y = (Math.random()-0.5)*2.4
      arr[i*3+0] = Math.cos(theta)*r
      arr[i*3+1] = y
      arr[i*3+2] = Math.sin(theta)*r
    }
    return arr
  },[])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={points.length/3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={'#00e5ff'} size={0.02} transparent opacity={0.6} />
    </points>
  )
}

export default function HologramHuman(){
  const [modelScale, setModelScale] = useState(0.35)
  const [modelInfo, setModelInfo] = useState(null)
  const controlsRef = useRef(null)
  function Controls(){
    const { camera, gl } = useThree()
    useEffect(()=>{
      const controls = new OrbitControls(camera, gl.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.minDistance = 0.5
      controls.maxDistance = 1000
      controls.target.set(0,1,0)
      controls.update()
      controlsRef.current = controls
      return ()=> controls.dispose()
    }, [camera, gl])
    return null
  }

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', padding:18 }}>
      <div style={{ width:'480px', height:'640px', borderRadius:14, background: 'radial-gradient(ellipse at center, rgba(0,24,30,0.6), rgba(0,6,10,0.9))', boxShadow:'inset 0 0 40px rgba(0,60,80,0.25)', position:'relative', overflow:'hidden', padding:'12px' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', mixBlendMode:'overlay', opacity:1 }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at center, rgba(0,200,255,0.02), rgba(0,0,0,0.6))' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(rgba(255,255,255,0.02) 0 1px, transparent 1px 4px)', mixBlendMode:'overlay', opacity:0.9 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0))', pointerEvents:'none' }} />
        </div>
        <Canvas camera={{ position:[0,1.2,6], fov:45, near:0.1, far:1000 }} style={{ width:'100%', height:'100%', borderRadius:12 }}>
          <color attach='background' args={['#001217']} />
          <fog attach='fog' args={['#001217', 0.5, 400]} />
          <ambientLight intensity={1.0} />
          <directionalLight position={[5,5,5]} intensity={0.9} color={'#66f0ff'} />

          <group position={[0,-0.15,0]}>
            {/* holographic grid floor */}
            <gridHelper args={[3.5, 36, '#007f9a', '#002b34']} position={[0,-1.02,0]} rotation={[Math.PI/2,0,0]} />
            {/* holographic cone volume */}
            <mesh position={[0,-0.4,0]} rotation={[0,0,0]}>
              <coneGeometry args={[2.6, 3.6, 48, 1, true]} />
              <meshBasicMaterial color={'#00dfff'} transparent opacity={0.04} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* render user's local GLB model placed at project root as /Male base.glb */}
            <React.Suspense fallback={null}>
                <GLTFHuman url={encodeURI('/Male base.glb')} position={[0,-0.15,0]} scale={modelScale} onLoaded={info=>setModelInfo(info)} />
            </React.Suspense>
            <Controls />
          </group>

          {/* subtle particle field */}
          <Particles />

          {/* subtle bloom-ish glow (additional mesh layer) */}
          <mesh position={[0,0.6,0]} scale={[2.6,2.6,2.6]}> 
            <sphereGeometry args={[0.6,32,32]} />
            <meshBasicMaterial color={'#00e5ff'} transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </Canvas>

        <div style={{ position:'absolute', left:12, right:12, bottom:12, display:'flex', gap:12, alignItems:'center', justifyContent:'center', pointerEvents:'auto' }}>
          <button onClick={()=>{
            if(!modelInfo || !controlsRef.current) return
            const { center, size } = modelInfo
            const cam = controlsRef.current.object
            const fov = cam.fov
            const maxDim = Math.max(size.x, size.y, size.z)
            const distance = Math.abs(maxDim / (2 * Math.tan((fov * Math.PI) / 180 / 2)))
            cam.position.set(center.x, center.y + (size.y * 0.35), center.z + distance * 1.05)
            controlsRef.current.target.copy(center)
            controlsRef.current.update()
          }} style={{ padding:'6px 10px', borderRadius:6, background:'#02333a', color:'#bfeff0', border:'1px solid rgba(255,255,255,0.04)' }}>Fit</button>

          <label style={{ color:'#bfeff0', fontSize:12, display:'flex', alignItems:'center', gap:8 }}>
            Scale
            <input type='range' min='0.2' max='1.2' step='0.01' value={modelScale} onChange={e=>setModelScale(parseFloat(e.target.value))} />
          </label>
        </div>
      </div>
    </div>
  )
}

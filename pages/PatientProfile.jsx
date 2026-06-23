
import React, { useState, useEffect } from 'react'

export default function PatientProfile() {

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    height: '',
    weight: '',
    conditions: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem('patientProfile')

    if (savedProfile) {
      setFormData(JSON.parse(savedProfile))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    localStorage.setItem(
      'patientProfile',
      JSON.stringify(formData)
    )

    setSaved(true)
  }

  return (
    <main className="flex-1 p-6 overflow-auto">

      <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">

        <h1 className="text-2xl font-bold text-white mb-6">
          Patient Profile
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

        </div>

        <div className="mt-4 flex flex-col gap-4">

          <textarea
            name="conditions"
            placeholder="Known Medical Conditions"
            value={formData.conditions}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <textarea
            name="medications"
            placeholder="Current Medications"
            value={formData.medications}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact Name"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

          <input
            type="text"
            name="emergencyPhone"
            placeholder="Emergency Contact Phone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className="bg-[#021726] p-3 rounded-lg text-white"
          />

        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
        >
          Save Profile
        </button>

        {saved && (
          <div className="mt-4 text-green-400 font-semibold">
            ✓ Patient Profile Saved Successfully
          </div>
        )}

      </div>

    </main>
  )
}


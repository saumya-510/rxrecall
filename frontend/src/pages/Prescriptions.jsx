import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const Prescriptions = () => {
  const [uploading, setUploading] = useState(false)

  const { data: prescriptions = [], refetch } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: () => api.get('/prescriptions').then(r => r.data)
  })

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      await api.post('/prescriptions', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Prescription processed!')
      refetch()
    } catch (err) {
      toast.error('Failed to process prescription')
    } finally {
      setUploading(false)
    }
  }, [refetch])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescriptions</h1>
        <p className="text-gray-500 mb-8">Upload a prescription photo — AI will read and extract your medicines.</p>
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer mb-8 ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400 bg-white'}`}>
          <input {...getInputProps()} />
          {uploading ? (
            <div><div className="text-4xl mb-3">⚙️</div><p className="text-gray-600 font-medium">Processing with AI... (15-30 seconds)</p></div>
          ) : (
            <div><div className="text-4xl mb-3">📷</div><p className="text-gray-700 font-medium">Drop prescription image here</p><p className="text-gray-400 text-sm mt-1">or click to browse</p></div>
          )}
        </div>
        <div className="space-y-4">
          {prescriptions.map(rx => (
            <div key={rx.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Prescription — {new Date(rx.uploadedAt).toLocaleDateString()}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{rx.medicines.length} medicines found</p>
                </div>
                <Link to={`/recovery/${rx.id}`} className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200">
                  View Recovery Plan →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {rx.medicines.map(med => (
                  <div key={med.id} className="bg-gray-50 rounded-xl p-3">
                    <div className="font-medium text-gray-800 text-sm">{med.name}</div>
                    {med.dosage && <div className="text-xs text-gray-500">{med.dosage}</div>}
                    {med.frequency && <div className="text-xs text-green-600">{med.frequency}</div>}
                    {med.instructions && <div className="text-xs text-gray-400 mt-1">{med.instructions}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {prescriptions.length === 0 && !uploading && (
            <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-2">📋</div><p>No prescriptions uploaded yet.</p></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prescriptions
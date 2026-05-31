import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💊</span>
          <span className="text-2xl font-bold text-green-800">RxRecall</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="px-4 py-2 text-green-700 text-sm font-medium hover:bg-green-50 rounded-lg">Log in</Link>
          <Link to="/signup" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">Get Started Free</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          AI-Powered Health Assistant
        </div>
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
          Your health, <span className="text-green-600">remembered.</span><br />Your recovery, guided.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track symptoms, scan prescriptions, get AI doctor summaries, and follow personalized recovery plans.
        </p>
        <Link to="/signup" className="inline-block bg-green-600 text-white text-lg font-medium px-8 py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200">
          Start for Free →
        </Link>
        <div className="grid grid-cols-3 gap-6 mt-24 text-left">
          {[
            { icon: '📝', title: 'Log Symptoms Daily', desc: 'Track what you feel, when, and how severe. Build a timeline your doctor will love.' },
            { icon: '📷', title: 'Scan Prescriptions', desc: 'Upload a prescription photo. AI reads it and sets up reminders automatically.' },
            { icon: '🤖', title: 'AI Doctor Briefs', desc: 'Get a clear summary of your symptoms before your appointment.' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Landing
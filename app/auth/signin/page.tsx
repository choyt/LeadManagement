import SignInForm from '@/components/SignInForm'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  )
}

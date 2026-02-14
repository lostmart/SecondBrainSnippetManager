import React, { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import Welcome from "./Welcome"

interface User {
	id: string
	email?: string
	user_metadata?: {
		full_name?: string
		avatar_url?: string
	}
}

const App = () => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		const checkSession = async () => {
			const { data: { user } } = await supabase.auth.getUser()
			if (user) {
				setUser(user as User)
			}
			setLoading(false)
		}

		checkSession()

		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.user) {
				setUser(session.user as User)
			} else {
				setUser(null)
			}
		})

		return () => subscription?.unsubscribe()
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Login attempt with:", { email, password })
		// Add actual login logic here
	}

	const handleGoogleLogin = async () => {
		console.log("Logging in with Google...")

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				// This tells Supabase where to send the user AFTER the Google handshake
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: {
					access_type: "offline",
					prompt: "consent",
				},
			},
		})

		if (error) {
			console.error("Error logging in:", error.message)
		} else {
			// Supabase will automatically handle the window redirect to Google
			console.log("Redirecting to Google...")
			console.log(data)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-900 font-medium">Loading...</p>
				</div>
			</div>
		)
	}

	if (user) {
		return <Welcome user={user} />
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
						Log in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-medium"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-medium"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Log in
						</button>
					</div>
				</form>

				<div className="mt-6">
					<button
						onClick={handleGoogleLogin}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Google_2020_-_%22G%22_icon.svg"
							alt="Google logo"
							className="h-5 w-5 mr-2"
						/>
						Log in with Google
					</button>
				</div>
			</div>
		</div>
	)
}

export default App

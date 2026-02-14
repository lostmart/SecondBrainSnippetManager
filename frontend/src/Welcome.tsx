import React, { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import SnippetsDisplay from "./components/SnippetsDisplay"
import AddSnippetForm from "./components/AddSnippetForm"

interface User {
	id: string
	email?: string
	user_metadata?: {
		full_name?: string
		avatar_url?: string
	}
}

interface Snippet {
  id: string;
  title: string;
  code_content: string;
  description?: string;
  language: string;
}

interface WelcomeProps {
	user: User
}

const Welcome: React.FC<WelcomeProps> = ({ user }) => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loadingSnippets, setLoadingSnippets] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchSnippets();
    }, [user.id]);

    const fetchSnippets = async () => {
        setLoadingSnippets(true);
        try {
            const { data, error } = await supabase
                .from("snippets")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching snippets:", error);
            } else {
                setSnippets(data || []);
            }
        } catch (err) {
            console.error("Failed to fetch snippets:", err);
        } finally {
            setLoadingSnippets(false);
        }
    };

    const handleSnippetAdded = (newSnippet: Snippet) => {
        setSnippets([newSnippet, ...snippets]);
    };


	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error("Error signing out:", error.message)
		}
	}

	const displayName = user.user_metadata?.full_name || user.email || "User"
	const avatarUrl = user.user_metadata?.avatar_url

	return (
		<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl text-center mb-8">
				{avatarUrl && (
					<img
						src={avatarUrl}
						alt="Profile"
						className="w-20 h-20 rounded-full mx-auto border-4 border-indigo-500"
					/>
				)}

				<div>
					<h1 className="text-4xl font-bold text-gray-900">
						Welcome! 👋
					</h1>
					<p className="mt-2 text-xl text-gray-900">
						{displayName}
					</p>
					<p className="mt-1 text-sm text-gray-800">
						{user.email}
					</p>
				</div>

				<div className="pt-6 space-y-4">
					<p className="text-gray-900 font-medium">
						You're all set! You can now start creating and managing your code snippets.
					</p>

					<div className="flex gap-3">
						<button
							onClick={() => setShowAddForm(true)}
							className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							+ Add Snippet
						</button>
						<button
							onClick={handleLogout}
							className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Log Out
						</button>
					</div>
				</div>
			</div>

            <div className="max-w-4xl w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center bg-white p-4 rounded-lg">Your Snippets</h2>
                {loadingSnippets ? (
                    <div className="text-center text-gray-900 text-lg bg-white p-6 rounded-lg">Loading snippets...</div>
                ) : (
                    <SnippetsDisplay snippets={snippets} />
                )}
            </div>

            {showAddForm && (
                <AddSnippetForm
                    userId={user.id}
                    onSnippetAdded={handleSnippetAdded}
                    onClose={() => setShowAddForm(false)}
                />
            )}
		</div>
	)
}

export default Welcome


import React, { useState } from "react"
import { supabase } from "../supabaseClient"

interface AddSnippetFormProps {
	userId: string
	onSnippetAdded: (snippet: any) => void
	onClose: () => void
}

const LANGUAGES = [
	"javascript",
	"typescript",
	"python",
	"java",
	"cpp",
	"csharp",
	"go",
	"rust",
	"php",
	"ruby",
	"swift",
	"kotlin",
	"sql",
	"html",
	"css",
	"bash",
	"json",
	"xml",
	"yaml",
	"markdown",
]

const AddSnippetForm: React.FC<AddSnippetFormProps> = ({
	userId,
	onSnippetAdded,
	onClose,
}) => {
	const [title, setTitle] = useState("")
	const [codeContent, setCodeContent] = useState("")
	const [description, setDescription] = useState("")
	const [language, setLanguage] = useState("javascript")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		// Validation
		if (!title.trim()) {
			setError("Title is required")
			return
		}
		if (!codeContent.trim()) {
			setError("Code content is required")
			return
		}

		setLoading(true)

		try {
			const { data, error: insertError } = await supabase
				.from("snippets")
				.insert([
					{
						user_id: userId,
						title: title.trim(),
						code_content: codeContent,
						description: description.trim() || null,
						language,
					},
				])
				.select()

			if (insertError) {
				setError(insertError.message)
				return
			}

			if (data && data[0]) {
				onSnippetAdded(data[0])
				onClose()
			}
		} catch (err) {
			setError("Failed to add snippet. Please try again.")
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Add New Snippet
					</h2>

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-red-900 text-sm font-medium">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Title Field */}
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-bold text-gray-900 mb-1"
							>
								Title *
							</label>
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="e.g., Hello World in Python"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
								disabled={loading}
							/>
						</div>

						{/* Language Field */}
						<div>
							<label
								htmlFor="language"
								className="block text-sm font-bold text-gray-900 mb-1"
							>
								Language *
							</label>
							<select
								id="language"
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
								disabled={loading}
							>
								{LANGUAGES.map((lang) => (
									<option key={lang} value={lang}>
										{lang.charAt(0).toUpperCase() + lang.slice(1)}
									</option>
								))}
							</select>
						</div>

						{/* Description Field */}
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-bold text-gray-900 mb-1"
							>
								Description (Optional)
							</label>
							<textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Describe what this snippet does..."
								rows={3}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
								disabled={loading}
							/>
						</div>

						{/* Code Content Field */}
						<div>
							<label
								htmlFor="code"
								className="block text-sm font-bold text-gray-900 mb-1"
							>
								Code Content *
							</label>
							<textarea
								id="code"
								value={codeContent}
								onChange={(e) => setCodeContent(e.target.value)}
								placeholder="Paste your code here..."
								rows={10}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm text-gray-900 bg-gray-50"
								disabled={loading}
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 pt-6">
							<button
								type="button"
								onClick={onClose}
								disabled={loading}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 font-bold hover:bg-gray-100 disabled:opacity-50"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={loading}
								className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
							>
								{loading && (
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								)}
								{loading ? "Adding..." : "Add Snippet"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddSnippetForm

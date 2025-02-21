"use client"

import { useState } from "react"
import Link from "next/link"
import { initialTopics } from '@/app/data';

export default function ForumPage() {
  const [topics, setTopics] = useState(initialTopics)
  const [newTopic, setNewTopic] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTopic.trim()) {
      setTopics([{ id: topics.length + 1, title: newTopic, author: "CurrentUser", replies: 0 }, ...topics])
      setNewTopic("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Forum & Q&A</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Start a new topic..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Post New Topic
        </button>
      </form>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.id} className="border rounded-lg p-4">
            <Link href={`/forum/${topic.id}`} className="text-xl font-semibold hover:underline">
              {topic.title}
            </Link>
            <p className="text-sm text-gray-500">
              Posted by {topic.author} | {topic.replies} replies
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

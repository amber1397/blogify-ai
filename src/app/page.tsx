'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tone: string;
  createdAt: string;
  readTime: string;
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tone, setTone] = useState('Professional');
  const [generating, setGenerating] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Future of Web Development in the Era of AI',
      summary: 'Discover how modern AI tools are reshaping frontend development, automated workflows, and full-stack engineering.',
      content: 'Full article content discussing AI in web development...',
      category: 'Technology',
      tone: 'Professional',
      createdAt: '2026-09-11T00:00:00.000Z',
      readTime: '4 min read',
    },
    {
      id: '2',
      title: '10 Essential Tips for Building Scalable Next.js Applications',
      summary: 'Learn best practices for performance optimization, server components, and efficient state management in Next.js.',
      content: 'Full article content discussing Next.js scaling...',
      category: 'Software Engineering',
      tone: 'Educational',
      createdAt: '2026-09-10T00:00:00.000Z',
      readTime: '6 min read',
    },
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setPosts(data.data);
        }
      } catch (error) {
        console.log('Using local fallback post preview.');
      }
    };

    fetchPosts();
  }, []);

  const handleGenerateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);

    const newPostLocal: BlogPost = {
      id: Date.now().toString(),
      title: topic,
      summary: `This is an AI-generated summary for: "${topic}". It breaks down key concepts for developers.`,
      content: `Full blog article discussing ${topic} with a ${tone} tone under ${category}.`,
      category,
      tone,
      createdAt: new Date().toISOString(),
      readTime: '3 min read',
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, tone }),
      });

      const data = await res.json();

      if (data.success) {
        setPosts([data.data, ...posts]);
      } else {
        setPosts([newPostLocal, ...posts]);
      }
    } catch (error) {
      setPosts([newPostLocal, ...posts]);
    } finally {
      setTopic('');
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Blogify<span className="text-indigo-500">.AI</span>
            </span>
          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium text-slate-400">
            <a href="#generator" className="hover:text-white transition-colors">
              Generator
            </a>
            <a href="#articles" className="hover:text-white transition-colors">
              Articles
            </a>
          </nav>
        </div>
      </header>

      <section id="generator" className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-4">
            Next-Gen Article Creation
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Generate High-Quality Articles with AI
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Transform any concept into a fully formatted, SEO-optimized blog post in seconds.
          </p>
        </div>

        <form
          onSubmit={handleGenerateBlog}
          className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                What do you want to write about?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Modern Full-Stack Development with Next.js..."
                required
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 text-white rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 text-white rounded-2xl px-4 py-3.5 focus:outline-none transition-all"
                >
                  <option value="Technology">Technology</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Web Design">Web Design</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Tone of Voice
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 text-white rounded-2xl px-4 py-3.5 focus:outline-none transition-all"
                >
                  <option value="Professional">Professional</option>
                  <option value="Educational">Educational</option>
                  <option value="Casual & Conversational">Casual & Conversational</option>
                  <option value="Engaging & Tech-Savvy">Engaging & Tech-Savvy</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {generating ? (
                <span>✨ Writing your blog post...</span>
              ) : (
                <span>✨ Generate Blog Article</span>
              )}
            </button>
          </div>
        </form>
      </section>

      <section id="articles" className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
            <p className="text-slate-400 text-sm mt-1">Explore all published and generated blog posts.</p>
          </div>
          <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
            {posts.length} Posts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post._id || post.id}
              className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all hover:bg-slate-800/60 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {post.category}
                  </span>
                  <div className="text-slate-500 space-x-2">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Tone: {post.tone}</span>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition-colors">
                  <span>Read Article</span>
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
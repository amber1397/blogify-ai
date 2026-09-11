import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Post from '../../../models/Post';

// GET: Fetch all posts
export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch posts', error },
      { status: 500 }
    );
  }
}

// POST: Generate & Save new post
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { topic, category, tone } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { success: false, message: 'Topic is required' },
        { status: 400 }
      );
    }

    const newPost = new Post({
      title: topic,
      summary: `This is an AI-generated summary for: "${topic}". It breaks down key concepts and practical takeaways.`,
      content: `Full blog article content discussing ${topic} in detail. Formatted with a ${tone} tone under ${category}.`,
      category: category || 'Technology',
      tone: tone || 'Professional',
      readTime: `${Math.floor(Math.random() * 4) + 3} min read`,
    });

    await newPost.save();
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create post', error },
      { status: 500 }
    );
  }
}
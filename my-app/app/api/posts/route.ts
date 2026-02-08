// api route for creating and getting posts in MongoDB

import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect';
import Post from '../../../models/Post';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newPost = await Post.create({
      title: body.title,
      buildingName: body.buildingName,
      type: body.type,
      notes: body.notes,
<<<<<<< HEAD
      location: body.location,
      author: body.authorId,
      authorPic: body.authorPic,
=======
      location: body.location, 
      author: body.authorId, 
>>>>>>> 8f3c859976d1ea37919ade08d2a170e27ec1fee1
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error("Post Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


<<<<<<< HEAD
=======
export async function GET() {
>>>>>>> 8f3c859976d1ea37919ade08d2a170e27ec1fee1
  try {
    await dbConnect();
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
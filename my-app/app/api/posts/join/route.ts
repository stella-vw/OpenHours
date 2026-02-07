import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request) {
  const { postId, attendeeName, attendeePhone } = await request.json();
  const client = await clientPromise;
  const db = client.db("mcwicsdb");

  // 1. Find the post to get the creator's phone number
  const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });

  // 2. Add the attendee to the database
  await db.collection("posts").updateOne(
    { _id: new ObjectId(postId) },
    { $push: { attendees: { name: attendeeName, phone: attendeePhone } } }
  );

  // 3. If the poster opted-in, send the SMS
  if (post.posterPhoneNumber) {
    await twilioClient.messages.create({
      body: `Hi! ${attendeeName} is joining your "${post.title}" activity. Contact: ${attendeePhone}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: post.posterPhoneNumber
    });
  }

  return NextResponse.json({ message: "Joined successfully!" });
}
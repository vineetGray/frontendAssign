// import { NextResponse } from "next/server";
// import { users } from "@/lib/usersData";

// // GET /api/users - Get all users
// export async function GET() {
//   try {
//     return NextResponse.json(users);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/users - Create a new user
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { name, role, avatar, skills } = body;

//     // Validate required fields
//     if (!name || !role || !skills) {
//       return NextResponse.json(
//         { error: "Name, role, and skills are required" },
//         { status: 400 }
//       );
//     }

//     // Create new user
//     const newUser = {
//       id: (users.length + 1).toString(),
//       name,
//       role,
//       avatar:
//         avatar ||
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       skills: Array.isArray(skills) ? skills : [skills],
//     };

//     users.push(newUser);
//     return NextResponse.json(newUser, { status: 201 });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to create user" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { users } from "@/lib/usersData";

// GET /api/users - Get all users
export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, avatar, skills } = body;

    // Validate required fields
    if (!name || !role || !skills) {
      return NextResponse.json(
        { error: "Name, role, and skills are required" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      role,
      avatar:
        avatar ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: Array.isArray(skills) ? skills : [skills],
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
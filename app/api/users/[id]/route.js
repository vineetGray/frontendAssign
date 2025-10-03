// import { NextResponse } from "next/server";
// import { users } from "@/lib/usersData";

// // PUT /api/users/[id] - Update a user
// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const body = await request.json();
//     const { name, role, avatar, skills } = body;

//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Update user
//     users[userIndex] = {
//       ...users[userIndex],
//       name: name || users[userIndex].name,
//       role: role || users[userIndex].role,
//       avatar: avatar || users[userIndex].avatar,
//       skills: skills || users[userIndex].skills,
//     };

//     return NextResponse.json(users[userIndex]);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to update user" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/users/[id] - Delete a user
// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;

//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const deletedUser = users.splice(userIndex, 1)[0];
//     return NextResponse.json(deletedUser);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to delete user" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { users } from "@/lib/usersData";

// GET /api/users/[id] - Get single user
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = users.find((u) => u.id === id);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, avatar, skills } = body;

    const userIndex = users.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate required fields
    if (!name || !role || !skills) {
      return NextResponse.json(
        { error: "Name, role, and skills are required" },
        { status: 400 }
      );
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name,
      role,
      avatar: avatar || users[userIndex].avatar,
      skills: Array.isArray(skills) ? skills : [skills],
    };

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const userIndex = users.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users.splice(userIndex, 1);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
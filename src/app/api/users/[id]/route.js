import { NextResponse } from "next/server";
import { users } from "@/lib/usersData";

// PUT /api/users/[id] - Update a user
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, role, avatar, skills } = body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      role: role || users[userIndex].role,
      avatar: avatar || users[userIndex].avatar,
      skills: skills || users[userIndex].skills,
    };

    return NextResponse.json(users[userIndex]);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    return NextResponse.json(deletedUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

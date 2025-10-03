// "use client";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import Image from "next/image";
// import { Edit2, Trash2, Search, Filter, Plus, User, ChevronDown, X, CheckCircle, AlertCircle } from "lucide-react";

// export default function ProfilePage() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSkill, setSelectedSkill] = useState("");
//   const [isAddingUser, setIsAddingUser] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     avatar: "",
//     skills: [],
//   });
//   const [imageErrors, setImageErrors] = useState({});
//   const [showSkillDropdown, setShowSkillDropdown] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   // Default options for dropdowns
//   const roleOptions = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "UI/UX Designer",
//     "DevOps Engineer",
//     "Product Manager",
//     "Data Scientist",
//     "Mobile Developer",
//     "QA Engineer",
//     "Technical Lead"
//   ];

//   const skillOptions = [
//     "React", "JavaScript", "CSS", "Node.js", "Python", 
//     "SQL", "TypeScript", "MongoDB", "Figma", "Adobe XD",
//     "Sketch", "Prototyping", "Docker", "AWS", "HTML",
//     "Vue", "Angular", "Java", "PHP", "Ruby"
//   ];

//   // Show notification
//   const showNotification = (message, type = "success") => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showSkillDropdown && !event.target.closest('.skill-dropdown-container')) {
//         setShowSkillDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showSkillDropdown]);

//   // Fetch users on component mount
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users based on search term and selected skill
//   useEffect(() => {
//     let filtered = users;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.role.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedSkill) {
//       filtered = filtered.filter((user) =>
//         user.skills.some((skill) =>
//           skill.toLowerCase().includes(selectedSkill.toLowerCase())
//         )
//       );
//     }

//     setFilteredUsers(filtered);
//   }, [users, searchTerm, selectedSkill]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = {
//         ...formData,
//         skills: formData.skills,
//       };

//       const response = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const newUser = await response.json();
//         setUsers([...users, newUser]);
//         setIsAddingUser(false);
//         setFormData({ name: "", role: "", avatar: "", skills: [] });
//         showNotification("Profile added successfully!", "success");
//       } else {
//         throw new Error("Failed to add user");
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//       showNotification("Failed to add profile. Please try again.", "error");
//     }
//   };

//   const handleEditUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = {
//         ...formData,
//         skills: formData.skills,
//       };

//       const response = await fetch(`/api/users/${editingUser.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         setUsers(
//           users.map((user) => (user.id === editingUser.id ? updatedUser : user))
//         );
//         setEditingUser(null);
//         setFormData({ name: "", role: "", avatar: "", skills: [] });
//         showNotification("Profile updated successfully!", "success");
//       } else {
//         throw new Error("Failed to update user");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       showNotification("Failed to update profile. Please try again.", "error");
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (confirm("Are you sure you want to delete this profile?")) {
//       try {
//         const response = await fetch(`/api/users/${userId}`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           setUsers(users.filter((user) => user.id !== userId));
//           showNotification("Profile deleted successfully!", "success");
//         } else {
//           throw new Error("Failed to delete user");
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         showNotification("Failed to delete profile. Please try again.", "error");
//       }
//     }
//   };

//   const handleImageError = (userId) => {
//     setImageErrors(prev => ({ ...prev, [userId]: true }));
//   };

//   const startEdit = (user) => {
//     setEditingUser(user);
//     setFormData({
//       name: user.name,
//       role: user.role,
//       avatar: user.avatar,
//       skills: user.skills,
//     });
//   };

//   const cancelEdit = () => {
//     setEditingUser(null);
//     setIsAddingUser(false);
//     setFormData({ name: "", role: "", avatar: "", skills: [] });
//   };

//   const resetFilters = () => {
//     setSearchTerm("");
//     setSelectedSkill("");
//   };

//   const handleSkillSelect = (skill) => {
//     if (!formData.skills.includes(skill)) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, skill]
//       });
//     }
//   };

//   const removeSkill = (skillToRemove) => {
//     setFormData({
//       ...formData,
//       skills: formData.skills.filter(skill => skill !== skillToRemove)
//     });
//   };

//   // Get all unique skills for filter dropdown
//   const allSkills = [...new Set(users.flatMap((user) => user.skills))];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
//       {/* Notification Popup */}
//       {notification.show && (
//         <div className={`fixed top-4 right-4 z-50 max-w-sm ${
//           notification.type === "success" 
//             ? "bg-green-50 border border-green-200 text-green-800" 
//             : "bg-red-50 border border-red-200 text-red-800"
//         } rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-right-full duration-500`}>
//           {notification.type === "success" ? (
//             <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
//           ) : (
//             <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//           )}
//           <span className="text-sm font-medium">{notification.message}</span>
//           <button
//             onClick={() => setNotification({ show: false, message: "", type: "" })}
//             className="ml-auto text-gray-400 hover:text-gray-600"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       )}

//       {/* Add Profile Overlay */}
//       {(isAddingUser || editingUser) && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
//             <CardHeader className="border-b border-gray-200/50 sticky top-0 bg-white z-10">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center gap-2 text-gray-900">
//                   {editingUser ? (
//                     <>
//                       <Edit2 size={20} className="text-blue-600" />
//                       Edit Profile
//                     </>
//                   ) : (
//                     <>
//                       <Plus size={20} className="text-blue-600" />
//                       Add New Profile
//                     </>
//                   )}
//                 </CardTitle>
//                 <button
//                   onClick={cancelEdit}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <form
//                 onSubmit={editingUser ? handleEditUser : handleAddUser}
//                 className="space-y-6"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
//                     <Input
//                       id="name"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       placeholder="Enter full name"
//                       className="focus:border-blue-500 focus:ring-blue-500 rounded-lg"
//                       required
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="role" className="text-sm font-semibold">Job Role *</Label>
//                     <div className="relative">
//                       <select
//                         id="role"
//                         value={formData.role}
//                         onChange={(e) =>
//                           setFormData({ ...formData, role: e.target.value })
//                         }
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
//                         required
//                       >
//                         <option value="">Select a role</option>
//                         {roleOptions.map((role) => (
//                           <option key={role} value={role}>
//                             {role}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="avatar" className="text-sm font-semibold">Avatar URL</Label>
//                     <Input
//                       id="avatar"
//                       value={formData.avatar}
//                       onChange={(e) =>
//                         setFormData({ ...formData, avatar: e.target.value })
//                       }
//                       placeholder="https://example.com/avatar.jpg"
//                       className="focus:border-blue-500 focus:ring-blue-500 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 {/* Skills Section - Moved below other fields */}
//                 <div className="space-y-2">
//                   <Label htmlFor="skills" className="text-sm font-semibold">Skills *</Label>
//                   <div className="relative">
//                     <select
//                       id="skills"
//                       value=""
//                       onChange={(e) => handleSkillSelect(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
//                     >
//                       <option value="">Select skills</option>
//                       {skillOptions.map((skill) => (
//                         <option key={skill} value={skill}>
//                           {skill}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
//                   </div>
                  
//                   {/* Selected Skills Display */}
//                   {formData.skills.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {formData.skills.map((skill, index) => (
//                         <span
//                           key={index}
//                           className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
//                         >
//                           {skill}
//                           <button
//                             type="button"
//                             onClick={() => removeSkill(skill)}
//                             className="hover:text-blue-600 focus:outline-none"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-3 pt-4 border-t border-gray-200/50">
//                   <Button 
//                     type="submit" 
//                     className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg px-6"
//                   >
//                     {editingUser ? "Update Profile" : "Add Profile"}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={cancelEdit}
//                     className="border-gray-300 rounded-lg px-6"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Left - Title */}
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Company Directory
//               </h1>
//             </div>

//             {/* Right - Add User Button */}
//             <Button 
//               onClick={() => setIsAddingUser(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Plus size={18} />
//               Add Profile
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Combined Search, Filter and Profile Cards Section */}
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader className="border-b border-gray-200/50">
//             <CardTitle className="text-xl font-bold text-gray-900">Profile Cards</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             {/* Search and Filter Section inside the same card */}
//             <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//               <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-end">
//                 {/* Search Input */}
//                 <div className="flex-1 w-full min-w-0">
//                   <Label htmlFor="search" className="text-sm font-semibold text-gray-700 mb-2 block">
//                     Search by name...
//                   </Label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <Input
//                       id="search"
//                       placeholder="Search by name or role..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 {/* Skill Filter Dropdown */}
//                 <div className="w-full lg:w-80 min-w-0 skill-dropdown-container relative">
//                   <Label htmlFor="skill-filter" className="text-sm font-semibold text-gray-700 mb-2 block">
//                     Select a skill
//                   </Label>
//                   <div className="relative">
//                     <div 
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 transition-colors"
//                       onClick={() => setShowSkillDropdown(!showSkillDropdown)}
//                     >
//                       <span className="text-gray-500 text-sm">
//                         {selectedSkill || "Select a skill"}
//                       </span>
//                       <ChevronDown className={`text-gray-400 h-4 w-4 transition-transform ${showSkillDropdown ? 'rotate-180' : ''}`} />
//                     </div>
                    
//                     {/* Skill Dropdown - Extended within the card */}
//                     {showSkillDropdown && (
//                       <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto">
//                         <div className="p-4">
//                           <div className="mb-3 text-sm font-semibold text-gray-700">Select a skill</div>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
//                             {allSkills.length > 0 ? (
//                               allSkills.map((skill) => (
//                                 <div
//                                   key={skill}
//                                   className={`px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-blue-50 transition-colors ${
//                                     selectedSkill === skill 
//                                       ? 'bg-blue-100 text-blue-800 border border-blue-200' 
//                                       : 'text-gray-700'
//                                   }`}
//                                   onClick={() => {
//                                     setSelectedSkill(skill);
//                                     setShowSkillDropdown(false);
//                                   }}
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     {selectedSkill === skill && (
//                                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                                     )}
//                                     {skill}
//                                   </div>
//                                 </div>
//                               ))
//                             ) : (
//                               <div className="px-3 py-4 text-sm text-gray-500 text-center bg-gray-50 rounded-lg col-span-2">
//                                 <User className="h-8 w-8 text-gray-300 mx-auto mb-2" />
//                                 No skills available
//                                 <div className="text-xs mt-1">Add profiles with skills to filter</div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Reset Button */}
//                 <div className="w-full lg:w-auto">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={resetFilters}
//                     className="w-full lg:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2.5"
//                     disabled={!searchTerm && !selectedSkill}
//                   >
//                     Clear Filters
//                   </Button>
//                 </div>
//               </div>

//               {/* Active Filters Display */}
//               {(searchTerm || selectedSkill) && (
//                 <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
//                   <span className="text-gray-500">Active filters:</span>
//                   {searchTerm && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                       Search: "{searchTerm}"
//                     </span>
//                   )}
//                   {selectedSkill && (
//                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
//                       Skill: {selectedSkill}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Results Counter */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{" "}
//                 <span className="font-semibold text-gray-900">{users.length}</span> profiles
//               </div>
//             </div>

//             {/* Users Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredUsers.map((user) => (
//                 <Card key={user.id} className="group hover:shadow-xl transition-all duration-300 relative border border-gray-200/50 overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
//                   {/* Gradient Border Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
//                   {/* Edit/Delete Icons at top right */}
//                   <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button
//                       onClick={() => startEdit(user)}
//                       className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors hover:scale-110 transform duration-200 border border-gray-200"
//                     >
//                       <Edit2 size={16} className="text-blue-600" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteUser(user.id)}
//                       className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors hover:scale-110 transform duration-200 border border-gray-200"
//                     >
//                       <Trash2 size={16} className="text-red-600" />
//                     </button>
//                   </div>

//                   <CardHeader className="text-center pb-4 pt-6">
//                     <div className="relative w-20 h-20 mx-auto mb-4">
//                       {user.avatar && !imageErrors[user.id] ? (
//                         <Image
//                           src={user.avatar}
//                           alt={user.name}
//                           fill
//                           className="rounded-full object-cover border-4 border-white shadow-lg"
//                           onError={() => handleImageError(user.id)}
//                         />
//                       ) : (
//                         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
//                           <User size={24} className="text-blue-600" />
//                         </div>
//                       )}
//                     </div>
//                     <CardTitle className="text-lg text-gray-900 font-semibold">{user.name}</CardTitle>
//                     <p className="text-blue-600 font-medium text-sm">{user.role}</p>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">
//                           Skills & Expertise
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {user.skills.map((skill, index) => (
//                             <span
//                               key={index}
//                               className="px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full font-medium border border-blue-200"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {filteredUsers.length === 0 && (
//               <div className="text-center py-16">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <User className="h-8 w-8 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {users.length === 0
//                       ? "No profiles yet"
//                       : "No profiles found"}
//                   </h3>
//                   <p className="text-gray-500 mb-6">
//                     {users.length === 0
//                       ? "Get started by adding your first profile to the directory."
//                       : "Try adjusting your search or filter criteria."}
//                   </p>
//                   {users.length === 0 && (
//                     <Button 
//                       onClick={() => setIsAddingUser(true)}
//                       className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                     >
//                       Add First Profile
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Search, Filter, Plus, User, ChevronDown, X, CheckCircle, AlertCircle, Tag } from "lucide-react";

export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    avatar: "",
    skills: [],
  });
  const [imageErrors, setImageErrors] = useState({});
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showAddSkillDropdown, setShowAddSkillDropdown] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Default options for dropdowns
  const roleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Product Manager",
    "Data Scientist",
    "Mobile Developer",
    "QA Engineer",
    "Technical Lead"
  ];

  const skillOptions = [
    "React", "JavaScript", "CSS", "Node.js", "Python", 
    "SQL", "TypeScript", "MongoDB", "Figma", "Adobe XD",
    "Sketch", "Prototyping", "Docker", "AWS", "HTML",
    "Vue", "Angular", "Java", "PHP", "Ruby",
    "Machine Learning", "Deep Learning", "Data Analysis", "UI Design"
  ];

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSkillDropdown && !event.target.closest('.skill-filter-container')) {
        setShowSkillDropdown(false);
      }
      if (showAddSkillDropdown && !event.target.closest('.add-skill-container')) {
        setShowAddSkillDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSkillDropdown, showAddSkillDropdown]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search terms and selected skill
  useEffect(() => {
    let filtered = users;

    if (searchName) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchRole) {
      filtered = filtered.filter((user) =>
        user.role.toLowerCase().includes(searchRole.toLowerCase())
      );
    }

    if (selectedSkill) {
      filtered = filtered.filter((user) =>
        user.skills.some((skill) =>
          skill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchName, searchRole, selectedSkill]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      // Ensure unique IDs by adding index if needed
      const usersWithUniqueIds = data.map((user, index) => ({
        ...user,
        uniqueId: `${user.id}-${index}` // Create a unique identifier
      }));
      setUsers(usersWithUniqueIds);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...formData,
        skills: formData.skills,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        // Add unique ID to the new user
        const userWithUniqueId = {
          ...newUser,
          uniqueId: `${newUser.id}-${Date.now()}` // Use timestamp for uniqueness
        };
        setUsers([...users, userWithUniqueId]);
        setIsAddingUser(false);
        setFormData({ name: "", role: "", avatar: "", skills: [] });
        showNotification("Profile added successfully!", "success");
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification("Failed to add profile. Please try again.", "error");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...formData,
        skills: formData.skills,
      };

      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) => 
            user.uniqueId === editingUser.uniqueId 
              ? { ...updatedUser, uniqueId: user.uniqueId } // Preserve the unique ID
              : user
          )
        );
        setEditingUser(null);
        setFormData({ name: "", role: "", avatar: "", skills: [] });
        showNotification("Profile updated successfully!", "success");
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification("Failed to update profile. Please try again.", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId));
          showNotification("Profile deleted successfully!", "success");
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        showNotification("Failed to delete profile. Please try again.", "error");
      }
    }
  };

  const handleImageError = (userId) => {
    setImageErrors(prev => ({ ...prev, [userId]: true }));
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      skills: user.skills,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setIsAddingUser(false);
    setFormData({ name: "", role: "", avatar: "", skills: [] });
  };

  const resetFilters = () => {
    setSearchName("");
    setSearchRole("");
    setSelectedSkill("");
  };

  const handleAddSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Get all unique skills for filter dropdown
  const allSkills = [...new Set(users.flatMap((user) => user.skills))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm ${
          notification.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        } rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-right-full duration-500`}>
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification({ show: false, message: "", type: "" })}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Profile Overlay */}
      {(isAddingUser || editingUser) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[95vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="border-b border-gray-200/50 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900 text-2xl">
                  {editingUser ? (
                    <>
                      <Edit2 size={24} className="text-blue-600" />
                      Edit Profile
                    </>
                  ) : (
                    <>
                      <Plus size={24} className="text-blue-600" />
                      Add New Profile
                    </>
                  )}
                </CardTitle>
                <button
                  onClick={cancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <form
                onSubmit={editingUser ? handleEditUser : handleAddUser}
                className="space-y-8"
              >
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter full name"
                        className="focus:border-blue-500 focus:ring-blue-500 rounded-lg py-3 text-base"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Job Role *</Label>
                      <div className="relative">
                        <select
                          id="role"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none text-base"
                          required
                        >
                          <option value="">Select a role</option>
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-3 lg:col-span-2">
                      <Label htmlFor="avatar" className="text-sm font-semibold text-gray-700">Avatar URL</Label>
                      <Input
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) =>
                          setFormData({ ...formData, avatar: e.target.value })
                        }
                        placeholder="https://example.com/avatar.jpg"
                        className="focus:border-blue-500 focus:ring-blue-500 rounded-lg py-3 text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional: Provide a URL for the profile picture
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Section - Improved Design */}
                <div className="space-y-4 add-skill-container">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">
                      Skills & Expertise *
                    </Label>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {formData.skills.length} selected
                    </span>
                  </div>
                  
                  {/* Skills Selection Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50 hover:border-blue-300 transition-colors">
                    <div className="text-center mb-4">
                      <Tag className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Add skills to showcase expertise</p>
                    </div>

                    {/* Skills Dropdown Trigger */}
                    <div className="relative mb-4">
                      <div 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 transition-colors shadow-sm"
                        onClick={() => setShowAddSkillDropdown(!showAddSkillDropdown)}
                      >
                        <span className="text-gray-600">
                          {formData.skills.length === 0 ? "Click to select skills..." : "Add more skills..."}
                        </span>
                        <ChevronDown className={`text-gray-400 h-5 w-5 transition-transform ${showAddSkillDropdown ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {/* Skills Dropdown - Improved Design */}
                      {showAddSkillDropdown && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-gray-700">Select Skills</h4>
                              <span className="text-xs text-gray-500">{skillOptions.length} available</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
                              {skillOptions.map((skill) => (
                                <div
                                  key={skill}
                                  className={`px-3 py-3 text-sm cursor-pointer rounded-lg border transition-all ${
                                    formData.skills.includes(skill) 
                                      ? 'bg-blue-50 text-blue-800 border-blue-200 shadow-sm' 
                                      : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                  }`}
                                  onClick={() => handleAddSkillSelect(skill)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                      formData.skills.includes(skill) 
                                        ? 'bg-blue-600 border-blue-600' 
                                        : 'bg-white border-gray-300'
                                    }`}>
                                      {formData.skills.includes(skill) && (
                                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                                      )}
                                    </div>
                                    <span className="font-medium">{skill}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Skills Display - Improved */}
                    {formData.skills.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Tag className="h-4 w-4" />
                          <span>Selected skills ({formData.skills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg border border-gray-200 min-h-12">
                          {formData.skills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`} // Use skill and index for unique key
                              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-sm rounded-full border border-blue-200 font-medium shadow-sm"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:text-blue-600 focus:outline-none transition-colors w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200/50">
                  <Button 
                    type="submit" 
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                    size="lg"
                  >
                    {editingUser ? (
                      <>
                        <Edit2 size={20} />
                        Update Profile
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Add Profile
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={cancelEdit}
                    className="border-gray-300 rounded-xl px-8 py-3 text-base font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left - Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Company Directory
              </h1>
            </div>

            {/* Right - Add User Button */}
            <Button 
              onClick={() => setIsAddingUser(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={18} />
              Add Profile
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Combined Search, Filter and Profile Cards Section */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-200/50">
            <CardTitle className="text-xl font-bold text-gray-900">Profile Cards</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Search and Filter Section inside the same card */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                {/* Search by Name */}
                <div className="space-y-2">
                  <Label htmlFor="search-name" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Search by name
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search-name"
                      placeholder="Search by name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* Search by Role */}
                <div className="space-y-2">
                  <Label htmlFor="search-role" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Search by role
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search-role"
                      placeholder="Search by role..."
                      value={searchRole}
                      onChange={(e) => setSearchRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* Skill Filter Dropdown */}
                <div className="space-y-2 skill-filter-container">
                  <Label htmlFor="skill-filter" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Filter by Skills
                  </Label>
                  <div className="relative">
                    <div 
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 transition-colors"
                      onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                    >
                      <span className="text-gray-500 text-sm">
                        {selectedSkill || "Select a skill"}
                      </span>
                      <ChevronDown className={`text-gray-400 h-4 w-4 transition-transform ${showSkillDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {/* Skill Dropdown - Extended within the card */}
                    {showSkillDropdown && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        <div className="p-3">
                          <div className="mb-2 text-sm font-semibold text-gray-700">Select a skill</div>
                          <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto">
                            {allSkills.map((skill, index) => (
                              <div
                                key={`${skill}-${index}`} // Use skill and index for unique key
                                className={`px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-blue-50 transition-colors ${
                                  selectedSkill === skill 
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                    : 'text-gray-700'
                                }`}
                                onClick={() => {
                                  setSelectedSkill(skill);
                                  setShowSkillDropdown(false);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {selectedSkill === skill && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  )}
                                  {skill}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2.5"
                  disabled={!searchName && !searchRole && !selectedSkill}
                >
                  Clear Filters
                </Button>
              </div>

              {/* Active Filters Display */}
              {(searchName || searchRole || selectedSkill) && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-500">Active filters:</span>
                  {searchName && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      Name: "{searchName}"
                    </span>
                  )}
                  {searchRole && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Role: "{searchRole}"
                    </span>
                  )}
                  {selectedSkill && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      Skill: {selectedSkill}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Counter */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{users.length}</span> profiles
              </div>
            </div>

            {/* Users Grid - FIXED: Use uniqueId instead of id */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.uniqueId} className="group hover:shadow-xl transition-all duration-300 relative border border-gray-200/50 overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  {/* Edit/Delete Icons at top right */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => startEdit(user)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors hover:scale-110 transform duration-200 border border-gray-200"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors hover:scale-110 transform duration-200 border border-gray-200"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>

                  <CardHeader className="text-center pb-4 pt-6">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      {user.avatar && !imageErrors[user.uniqueId] ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover border-4 border-white shadow-lg"
                          onError={() => handleImageError(user.uniqueId)}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
                          <User size={24} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-semibold">{user.name}</CardTitle>
                    <p className="text-blue-600 font-medium text-sm">{user.role}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">
                          Skills & Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span
                              key={`${user.uniqueId}-${skill}-${index}`} // Use unique combination
                              className="px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full font-medium border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {users.length === 0
                      ? "No profiles yet"
                      : "No profiles found"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {users.length === 0
                      ? "Get started by adding your first profile to the directory."
                      : "Try adjusting your search or filter criteria."}
                  </p>
                  {users.length === 0 && (
                    <Button 
                      onClick={() => setIsAddingUser(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Add First Profile
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
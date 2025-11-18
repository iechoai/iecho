"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Calendar,
  Globe,
  Save,
  Edit2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Logo } from "./Logo";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  avatar?: string;
  preferences: {
    defaultAudience: "all" | "students" | "developers";
    emailNotifications: boolean;
    darkMode: boolean;
    publicProfile: boolean;
  };
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Passionate developer and lifelong learner. Always exploring new tools and technologies to enhance productivity and creativity.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    joinDate: "March 2024",
    preferences: {
      defaultAudience: "developers",
      emailNotifications: true,
      darkMode: false,
      publicProfile: true,
    },
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePreferences = (
    field: keyof UserProfile["preferences"],
    value: any
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/90 dark:bg-card/90 backdrop-blur-md border-b border-white/20 dark:border-border/30 px-6 py-4 sticky top-0 z-50 shadow-sm shadow-black/5 dark:shadow-black/20">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100/80 dark:hover:bg-muted/50 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo width={24} height={24} />
            <span className="text-lg font-medium text-[#0F5F6A] dark:text-primary">
              IechoAI
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#0F5F6A] to-[#0F5F6A]/80 dark:from-primary dark:to-primary/80 text-white dark:text-primary-foreground border-4 border-white/50 dark:border-border/30 shadow-xl rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {(isEditing ? editedProfile.name : profile.name)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#0F5F6A] dark:bg-primary rounded-full flex items-center justify-center text-white dark:text-primary-foreground shadow-lg hover:scale-105 transition-all">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => updateProfile("name", e.target.value)}
                      className="text-xl font-semibold bg-white/80 dark:bg-input/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50"
                      placeholder="Your name"
                    />
                    <Input
                      value={editedProfile.email}
                      onChange={(e) => updateProfile("email", e.target.value)}
                      type="email"
                      className="text-sm bg-white/80 dark:bg-input/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50"
                      placeholder="Your email"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-foreground mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-gray-600 dark:text-muted-foreground mb-3">
                      {profile.email}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {profile.joinDate}
                      </div>
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground shadow-md hover:shadow-lg transition-all"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="my-6 h-px bg-gray-200/50 dark:bg-border/50"></div>

          {/* Bio Section */}
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground mb-2 block">
              Bio
            </Label>
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                className="bg-white/80 dark:bg-input/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50 min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                {profile.bio || "No bio added yet."}
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground">
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => updateProfile("location", e.target.value)}
                    className="mt-1 bg-white/80 dark:bg-input/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50"
                    placeholder="Your location"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-muted-foreground mt-1">
                    {profile.location || "Not specified"}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground">
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    value={editedProfile.website}
                    onChange={(e) => updateProfile("website", e.target.value)}
                    className="mt-1 bg-white/80 dark:bg-input/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <div className="mt-1">
                    {profile.website ? (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F5F6A] dark:text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        {profile.website}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-muted-foreground">
                        No website added
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">
              Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground">
                  Default Audience Filter
                </Label>
                <div className="mt-2 flex gap-2">
                  {(["all", "students", "developers"] as const).map(
                    (audience) => (
                      <Badge
                        key={audience}
                        variant={
                          editedProfile.preferences.defaultAudience === audience
                            ? "default"
                            : "outline"
                        }
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          editedProfile.preferences.defaultAudience === audience
                            ? "bg-[#0F5F6A] dark:bg-primary text-white dark:text-primary-foreground"
                            : "bg-white/80 dark:bg-card/80 backdrop-blur-sm border-gray-200/50 dark:border-border/50 hover:bg-gray-50 dark:hover:bg-muted/50"
                        }`}
                        onClick={() =>
                          isEditing &&
                          updatePreferences("defaultAudience", audience)
                        }
                      >
                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">
                    Receive updates about new tools
                  </p>
                </div>
                <Switch
                  checked={editedProfile.preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    isEditing &&
                    updatePreferences("emailNotifications", checked)
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-muted-foreground">
                    Public Profile
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">
                    Allow others to see your profile
                  </p>
                </div>
                <Switch
                  checked={editedProfile.preferences.publicProfile}
                  onCheckedChange={(checked) =>
                    isEditing && updatePreferences("publicProfile", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">
            Account Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50/80 dark:bg-muted/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#0F5F6A] dark:text-primary mb-1">
                12
              </div>
              <div className="text-sm text-gray-600 dark:text-muted-foreground">
                Tools Saved
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50/80 dark:bg-muted/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#0F5F6A] dark:text-primary mb-1">
                47
              </div>
              <div className="text-sm text-gray-600 dark:text-muted-foreground">
                Tools Explored
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50/80 dark:bg-muted/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#0F5F6A] dark:text-primary mb-1">
                8
              </div>
              <div className="text-sm text-gray-600 dark:text-muted-foreground">
                Days Active
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

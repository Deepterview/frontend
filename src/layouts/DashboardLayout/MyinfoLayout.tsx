import { useState } from "react";
import { motion } from "framer-motion";
import type { UserProfile } from "../../types/types";
import AvatarUpload from "../../components/dashboard/myinfo/AvatarUpload";
import ProfileForm from "../../components/dashboard/myinfo/ProfileForm";
import AccountActions from "../../components/dashboard/myinfo/AccountActions";

const MyinfoLayout = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Kim Dong ju",
    email: "kimdongju123@gmail.com",
    avatar: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      alert("Account deletion requested.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-5xl font-black tracking-tighter text-[#e1e2e7] mb-4">
          My Profile
        </h2>
        <p className="text-[#cbc3d7]/60 text-lg font-light">
          Manage your personal information and account settings
        </p>
      </motion.div>

      <motion.div
        className="bg-[#191c1f] rounded-[3rem] p-12 border border-[#494454]/10 shadow-[0_0_80px_rgba(0,0,0,0.3)] space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <AvatarUpload
          avatar={profile.avatar}
          onAvatarChange={(newAvatar) => handleFieldChange("avatar", newAvatar)}
        />

        <ProfileForm profile={profile} onChange={handleFieldChange} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <AccountActions
            onSave={handleSave}
            onDelete={handleDelete}
            isSaving={isSaving}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyinfoLayout;

import { useState } from "react";
import { motion } from "framer-motion";
import type { UserProfile } from "../../types/types";
import AvatarUpload from "../../components/dashboard/myinfo/AvatarUpload";
import ProfileForm from "../../components/dashboard/myinfo/ProfileForm";
import AccountActions from "../../components/dashboard/myinfo/AccountActions";

const MyinfoLayout = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "김동우",
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
      alert("프로필이 성공적으로 업데이트되었습니다!");
    }, 1000);
  };

  const handleDelete = () => {
    if (
      window.confirm("계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      alert("계정 삭제가 요청되었습니다.");
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
          내 프로필
        </h2>
        <p className="text-[#cbc3d7]/60 text-lg font-light">
          개인 정보 및 계정 설정을 관리하세요
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

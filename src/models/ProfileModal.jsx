import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { getActorProfile } from "../api/actor";
import { useNotification } from "../hooks";

const ProfileModal = ({ visible, profileId, onClose }) => {
  const [profile, setProfile] = useState({});
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const fetchActorProfile = async () => {
    setBusy(true);
    const { error, actor } = await getActorProfile(profileId);
    setBusy(false);

    if (error) return updateNotification("error", error);

    setProfile(actor);
  };

  useEffect(() => {
    if (profileId) fetchActorProfile();
  }, [profileId]);

  const { avatar, name, about } = profile;

  return (
    !busy && (
      <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
        <div className="w-72 p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3">
          <img className="w-28 h-28 rounded-full" src={avatar} alt="" />
          <h1 className="dark:text-white text-primary font-semibold">{name}</h1>
          <p className="dark:text-dark-subtle text-light-subtle text-justify">
            {about}
          </p>
        </div>
      </ModalContainer>
    )
  );
};

export default ProfileModal;

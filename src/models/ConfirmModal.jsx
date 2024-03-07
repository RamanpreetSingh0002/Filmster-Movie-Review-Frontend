import React from "react";
import ModalContainer from "./ModalContainer";
import { ImSpinner3 } from "react-icons/im";

const ConfirmModal = ({
  visible,
  busy,
  title,
  subTitle,
  onConfirm,
  onCancel,
}) => {
  const commonClass = "px-3 py-1 text-white rounded";

  return (
    <ModalContainer visible={visible} ignoreContainer>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 font-semibold text-lg">{title}</h1>
        <p className="text-secondary dark:text-white text-sm">{subTitle}</p>
        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="text-primary dark:text-white text-sm flex items-center space-x-2">
              <ImSpinner3 className="animate-spin" />
              <span>Please Wait</span>
            </p>
          ) : (
            <>
              <button
                onClick={onConfirm}
                type="button"
                className={commonClass + " bg-red-400"}
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                type="button"
                className={commonClass + " bg-blue-400"}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;

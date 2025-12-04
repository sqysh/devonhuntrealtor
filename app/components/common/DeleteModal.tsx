"use client";

import { useState } from "react";
import Spinner from "../Spinner";

export const useDeleteModal = () => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return { show, openModal, closeModal };
};

interface DeleteModalProps {
  idAndName: {
    id: string;
    name: string;
  };
  deleteDocument: (data: { id: string }) => any;
  loading: boolean;
  hook: ReturnType<typeof useDeleteModal>;
}

const DeleteModal = ({
  idAndName,
  deleteDocument,
  loading,
  hook,
}: DeleteModalProps) => {
  const getAction = async () => {
    await deleteDocument({ id: idAndName.id })
      .unwrap()
      .then(() => {
        hook.closeModal();
      });
  };

  if (!hook.show) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={hook.closeModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[#09090b] border border-neutral-800 rounded-xl shadow-2xl p-6 min-h-72 w-full max-w-md flex flex-col justify-between pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 flex items-center">
            <p className="font-medium text-gray-400 text-lg">
              Are you sure you want to delete{" "}
              <span className="text-red-500 font-bold">{idAndName.name}</span>?
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              className="px-6 py-2.5 text-red-500 border-2 border-red-500 rounded-lg duration-200 hover:bg-red-500/10 hover:shadow-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={hook.closeModal}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 bg-red-500 border-2 border-red-500 text-white rounded-lg duration-200 hover:bg-red-600 hover:border-red-600 hover:shadow-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] flex items-center justify-center"
              onClick={getAction}
              disabled={loading}
            >
              {loading ? <Spinner fill="fill-white" /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;

"use client";
import { AddButton } from "@/components/Buttons";
import AddSubgroupModal from "./AddSubgroupModal";
import { useState } from "react";
import { Group } from "@/models/groups";

type AddSubgroupButtonProps = {
  rootGroup: Group;
  onAdded?: () => void;
};

export default function AddSubgroupButton(
  props: Readonly<AddSubgroupButtonProps>
) {
  const { rootGroup, onAdded } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const action = () => {
    showModal();
  };

  return (
    <>
      <form action={action}>
        <AddButton type="submit" title="Add Subgroup" />
      </form>
      <AddSubgroupModal
        rootGroup={rootGroup}
        show={isModalOpen}
        onClose={closeModal}
        onAdded={onAdded}
      />
    </>
  );
}

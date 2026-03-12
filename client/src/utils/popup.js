import Swal from "sweetalert2";

export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonColor: "#2563eb"
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#ef4444"
  });
};

export const showConfirm = async (message) => {
  const result = await Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#9ca3af",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel"
  });

  return result.isConfirmed;
};
import Swal from "sweetalert2";

export const swalAlert = (title, text = "", icon = "info") => {

  //icon: info, success, warning, error, question
  //swal import edilmeli

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};
export const swalConfirm = (
  title,
  text = "",
  icon = "info",
  confirmButtonText = "Yes"
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
  });
};

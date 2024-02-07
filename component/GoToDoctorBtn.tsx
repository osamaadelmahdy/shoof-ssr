"use client";
function GoToDoctorBtn() {
  return (
    <button
      className="bg-pink-600 rounded-md p-2 text-white hover:bg-pink-400"
      onClick={() =>
        window.open("https://shoofdoctor.com/primary_doctors", "_blank")
      }
    >
      حجز الدكتور
    </button>
  );
}

export default GoToDoctorBtn;

"use client";
 
export default function ButtonComponent() {
  function handleClick() {
    console.log("clicked");
  }
 
  return (
    <button type="button" onClick={handleClick}>
      ปุ่มทดลอง 67
    </button>
  );
}
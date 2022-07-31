import { useState } from 'react'

const useModal = () => {
  const [isShow, setIsShow] = useState(false)

  function toggle() {
    setIsShow(!isShow)
  }

  return{
    isShow,
    toggle
  };
};

export default useModal

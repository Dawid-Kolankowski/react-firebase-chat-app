import React, { useState } from 'react'
import styled from 'styled-components'
import { MoodHappySolid } from '@styled-icons/zondicons'
import Picker from 'emoji-picker-react'
import useHideOnLostFocus from '../../hooks/useHideOnLostFocus'

const EmojiMenu = ({
  setInputValue,
}: {
  setInputValue: (input: string) => void
}) => {
  const [pickerState, setPickerState] = useState(false)
  const pickerRef = useHideOnLostFocus(setPickerState as () => void)

  return (
    <>
      {pickerState ? (
        <EmojiPicker ref={pickerRef}>
          <Picker
            onEmojiClick={(_event, selectedEmoji) =>
              setInputValue(selectedEmoji.emoji)
            }
          />
        </EmojiPicker>
      ) : null}
      <Button onClick={() => setPickerState(!pickerState)}>
        <ButtonIcon />
      </Button>
    </>
  )
}

export default EmojiMenu

const ButtonIcon = styled(MoodHappySolid)`
  width: 25px;
  height: 25px;
  color: white;
`
const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
`

const EmojiPicker = styled.span`
  position: absolute;
  bottom: 50px;
  right: 0;
`

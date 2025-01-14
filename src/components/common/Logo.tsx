import { colors } from '../../theme'

interface Props {
  width?: string | number
  height?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
}

export function Logo({
  width = 40,
  height = 40,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
      }}
    >
      <path
        d="M30 0H10C4.47715 0 0 4.47715 0 10V30C0 35.5229 4.47715 40 10 40H30C35.5229 40 40 35.5229 40 30V10C40 4.47715 35.5229 0 30 0Z"
        fill={colors.primary}
      />
      <path
        d="M23.677 22.6048L28.5155 29.3334H24.5464L20.1237 23.0963H16.0413V29.3334H12.9038V10.8488H19.7835C22.5808 10.8488 24.5842 11.3276 25.7938 12.2853C27.0287 13.2177 27.6461 14.7423 27.6461 16.8591C27.6461 19.9084 26.3231 21.8236 23.677 22.6048ZM19.8969 20.299C21.6358 20.299 22.8328 20.0344 23.488 19.5052C24.1432 18.976 24.4708 18.0814 24.4708 16.8213C24.4708 15.6117 24.1432 14.7927 23.488 14.3643C22.8328 13.9107 21.661 13.6838 19.9725 13.6838H16.0413V20.299H19.8969Z"
        fill="black"
      />
    </svg>
  )
}

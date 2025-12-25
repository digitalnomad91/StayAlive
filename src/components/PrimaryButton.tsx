import { Pressable, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
};

// ✅ Reusable button base for consistent sizing.
export const PrimaryButton = ({
  label,
  onPress,
  className,
  textClassName,
}: PrimaryButtonProps) => (
  <Pressable onPress={onPress} className={className}>
    <Text className={textClassName}>{label}</Text>
  </Pressable>
);

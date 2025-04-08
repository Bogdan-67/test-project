import React, { memo, useCallback } from 'react';

interface ButtonProps {
  onClick: (id: number) => void;
  id: number;
  disabled: boolean;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled, children }) => {
	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		onClick(id);
	}, []);
	
	return (
		<button onClick={handleClick} disabled={disabled}>{children}</button>
	)
}

export default memo(Button);

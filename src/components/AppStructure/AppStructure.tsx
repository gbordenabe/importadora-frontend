import React from "react";
import style from "./AppStructure.module.css";

interface AppStructureProps {
	children: React.ReactNode;
}

export const AppStructure = ({ children }: AppStructureProps) => {
	return (
		<main className={style.appContainer}>
			<div className={style.contentContainer}>{children}</div>
		</main>
	);
};

import React from "react";
import Header from "./Header";

type Prop = {
	children: React.ReactNode;
};

function Layout({ children }: Prop) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

export default Layout;

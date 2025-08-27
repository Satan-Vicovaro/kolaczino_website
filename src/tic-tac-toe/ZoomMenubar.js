import React from "react";
import { Toolbar } from "radix-ui";
import { MinusIcon, PlusIcon, ResetIcon, ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";

export default () => (
	<Toolbar.Root>
		<Toolbar.Button> <ZoomInIcon /> </Toolbar.Button>
		<Toolbar.Button> <ZoomOutIcon /> </Toolbar.Button>
		<Toolbar.Button> <ResetIcon /> </Toolbar.Button>
	</Toolbar.Root>
);


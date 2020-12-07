import React, {useState} from "react";
import Drawer from "@material-ui/core/Drawer";

const [drawerState, setDrawerState] = useState(false)

const toggleDrawer = (state) {

    setDrawerState(state)
}

export default function MenuDrawer() {
  return (
    <div>
        <Button onClick={toggleDrawer(true)} />
      <Drawer anchor="top" open={drawerState} />
    </div>
  );
}

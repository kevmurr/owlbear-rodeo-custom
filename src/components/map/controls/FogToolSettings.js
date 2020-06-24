import React, { useContext, useEffect } from "react";
import { Flex } from "theme-ui";

import EdgeSnappingToggle from "./EdgeSnappingToggle";
import RadioIconButton from "./RadioIconButton";

import FogBrushIcon from "../../../icons/FogBrushIcon";
import FogPolygonIcon from "../../../icons/FogPolygonIcon";
import FogRemoveIcon from "../../../icons/FogRemoveIcon";
import FogToggleIcon from "../../../icons/FogToggleIcon";
import FogAddIcon from "../../../icons/FogAddIcon";
import FogSubtractIcon from "../../../icons/FogSubtractIcon";

import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";

import Divider from "../../Divider";

import MapInteractionContext from "../../../contexts/MapInteractionContext";

function BrushToolSettings({
  settings,
  onSettingChange,
  onToolAction,
  disabledActions,
}) {
  const { interactionEmitter } = useContext(MapInteractionContext);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown({ key, ctrlKey, metaKey, shiftKey }) {
      if (key === "Alt") {
        onSettingChange({ useFogSubtract: !settings.useFogSubtract });
      } else if (key === "p") {
        onSettingChange({ type: "polygon" });
      } else if (key === "b") {
        onSettingChange({ type: "brush" });
      } else if (key === "t") {
        onSettingChange({ type: "toggle" });
      } else if (key === "r") {
        onSettingChange({ type: "remove" });
      } else if (key === "s") {
        onSettingChange({ useEdgeSnapping: !settings.useEdgeSnapping });
      } else if (
        key === "z" &&
        (ctrlKey || metaKey) &&
        shiftKey &&
        !disabledActions.includes("redo")
      ) {
        onToolAction("fogRedo");
      } else if (
        key === "z" &&
        (ctrlKey || metaKey) &&
        !shiftKey &&
        !disabledActions.includes("undo")
      ) {
        onToolAction("fogUndo");
      }
    }

    function handleKeyUp({ key }) {
      if (key === "Alt") {
        onSettingChange({ useFogSubtract: !settings.useFogSubtract });
      }
    }

    interactionEmitter.on("keyDown", handleKeyDown);
    interactionEmitter.on("keyUp", handleKeyUp);
    return () => {
      interactionEmitter.off("keyDown", handleKeyDown);
      interactionEmitter.off("keyUp", handleKeyUp);
    };
  });

  return (
    <Flex sx={{ alignItems: "center" }}>
      <RadioIconButton
        title="Fog Polygon"
        onClick={() => onSettingChange({ type: "polygon" })}
        isSelected={settings.type === "polygon"}
      >
        <FogPolygonIcon />
      </RadioIconButton>
      <RadioIconButton
        title="Fog Brush"
        onClick={() => onSettingChange({ type: "brush" })}
        isSelected={settings.type === "brush"}
      >
        <FogBrushIcon />
      </RadioIconButton>
      <Divider vertical />
      <RadioIconButton
        title="Toggle Fog"
        onClick={() => onSettingChange({ type: "toggle" })}
        isSelected={settings.type === "toggle"}
      >
        <FogToggleIcon />
      </RadioIconButton>
      <RadioIconButton
        title="Remove Fog"
        onClick={() => onSettingChange({ type: "remove" })}
        isSelected={settings.type === "remove"}
      >
        <FogRemoveIcon />
      </RadioIconButton>
      <Divider vertical />
      <RadioIconButton
        title="Add Fog"
        onClick={() => onSettingChange({ useFogSubtract: false })}
        isSelected={!settings.useFogSubtract}
      >
        <FogAddIcon />
      </RadioIconButton>
      <RadioIconButton
        title="Subtract Fog"
        onClick={() => onSettingChange({ useFogSubtract: true })}
        isSelected={settings.useFogSubtract}
      >
        <FogSubtractIcon />
      </RadioIconButton>
      <Divider vertical />
      <EdgeSnappingToggle
        useEdgeSnapping={settings.useEdgeSnapping}
        onEdgeSnappingChange={(useEdgeSnapping) =>
          onSettingChange({ useEdgeSnapping })
        }
      />
      <Divider vertical />
      <UndoButton
        onClick={() => onToolAction("fogUndo")}
        disabled={disabledActions.includes("undo")}
      />
      <RedoButton
        onClick={() => onToolAction("fogRedo")}
        disabled={disabledActions.includes("redo")}
      />
    </Flex>
  );
}

export default BrushToolSettings;

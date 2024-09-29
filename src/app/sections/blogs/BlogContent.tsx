"use client"

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useMemo, useState } from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import "./style.css";

export default function BlogContent({ content }: { content: any }) {
    const [longDescription, setLongDescription] = useState();

    useEffect(() => setLongDescription(content), [])

    const editor = useMemo(() => {
        if (longDescription === "loading") {
            return undefined;
        }
        return BlockNoteEditor.create({ initialContent: longDescription });
    }, [longDescription]);

    return (
        <div className="pointer-events-none w-full">
            <BlockNoteView className="w-full" theme={"light"} editor={editor} editable={false} contentEditable={false} />
        </div>
    )
}

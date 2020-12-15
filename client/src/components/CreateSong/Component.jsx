import React from 'react';
import { CreateLine } from "./elements/CreateLine";
import { MusicGrid, AverageEditBtn, Row, LineLabel, Line, SmallEditBtn } from "../../ui-kit";
import { ToolsLine } from "./elements/ToolsLine";

export const CreateSong = ({
    partition,
    lengthOfPage,
    currentPage,
    pages,
    instruments,
    toggleActiveNote,
    highlightedNote,
    animatedNotes,
    toggleIsAddInstrumentVisible,
}) => {
    return (
        <div
        style={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <MusicGrid>
          <ToolsLine
            totalLength={partition[0] && partition[0].length}
            lengthOfPage={lengthOfPage}
            isLastPage={currentPage === pages.length}
            currentPage={currentPage}
          />
          {instruments.length ? (
            <React.Fragment>
              {instruments.map((instrument, i) => {
                return (
                  <CreateLine
                    key={i}
                    linePosition={i}
                    label={instrument.label}
                    notes={partition[i]}
                    noteColors={instrument.colors}
                    toggleActiveNote={toggleActiveNote}
                    sounds={instrument.sounds}
                    pitches={instrument.pitches}
                    highlightedNote={highlightedNote}
                    animatedNotes={animatedNotes}
                    currentPage={currentPage}
                    lenghtOfPage={lengthOfPage}
                  />
                );
              })}
              <Line>
                <LineLabel width={'124px'}>
                  <AverageEditBtn onClick={toggleIsAddInstrumentVisible}>+ Add instrument</AverageEditBtn>
                </LineLabel>
              </Line>
          </React.Fragment>
          ) : (
            <AverageEditBtn padding={'8px 8px 8px 8px'} onClick={toggleIsAddInstrumentVisible}>
              No partition to display yet... Click here to add your first instrument
            </AverageEditBtn>
          )}
        </MusicGrid>
      </div>
    );
}
import React from 'react';
import { CreateLine } from "./elements/CreateLine";
import { MusicGrid, AverageEditBtn, Row } from "../../ui-kit";
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
    toggleIsRemoveInstrumentVisible,
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
            <Row padding='16px 0px 0px 0px'>
              <AverageEditBtn padding='2px 16px 2px 16px' onClick={toggleIsAddInstrumentVisible}>+ Add <br/>instrument</AverageEditBtn>
              <AverageEditBtn padding='2px 16px 2px 16px' onClick={toggleIsRemoveInstrumentVisible}>- Remove <br/>instrument</AverageEditBtn>
            </Row>
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
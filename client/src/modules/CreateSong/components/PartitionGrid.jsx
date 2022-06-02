import React from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid, AverageEditBtn, LineLabel, Line } from "../../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ToolsLine } from "./ToolsLine";

export const PartitionGrid = ({
  partition,
  lengthOfPage,
  currentPage,
  pages,
  instruments,
  toggleActiveNote,
  highlightedNote,
  animatedNotes,
  addOneBar,
  removeOneBar,
  toggleIsAddInstrumentVisible,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 760,
      }}
    >
      <div
        style={{
          minHeight: 300,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <MusicGrid>
          {instruments.length ? (
            <React.Fragment>
              <ToolsLine
                totalLength={partition[0] && partition[0].length}
                lengthOfPage={lengthOfPage}
                isLastPage={currentPage === pages.length}
                currentPage={currentPage}
              />
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
                    lengthOfPage={lengthOfPage}
                  />
                );
              })}
              <Line>
                <LineLabel width={"124px"}>
                  <AverageEditBtn onClick={toggleIsAddInstrumentVisible}>
                    + Add instrument
                  </AverageEditBtn>
                </LineLabel>
              </Line>
            </React.Fragment>
          ) : (
            <AverageEditBtn
              padding={"8px 8px 8px 8px"}
              onClick={toggleIsAddInstrumentVisible}
            >
              No partition to display yet... Click here to add your first
              instrument
            </AverageEditBtn>
          )}
        </MusicGrid>
      </div>
      {!!instruments?.length && (
        <div style={{ display: "flex" }}>
          <AverageEditBtn height="160px" onClick={removeOneBar}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </AverageEditBtn>
          <AverageEditBtn height="160px" onClick={addOneBar}>
            <FontAwesomeIcon icon={faChevronRight} />
          </AverageEditBtn>
        </div>
      )}
    </div>
  );
};

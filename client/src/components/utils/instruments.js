import axios from "axios";

export const preparePartition = (instruments, length) => {
    const partition = [];
    instruments.forEach((el) => {
      const emptyLine = [];
      for (let i = 1; i <= length; i++) {
        emptyLine.push(0);
      }
      partition.push(emptyLine);
    });
    return partition;
  };
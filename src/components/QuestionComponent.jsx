import React from "react";
import { Box, Radio, RadioGroup, Text } from '@chakra-ui/react'

const QuestionComponent = ({ que, submit, submission }) => {
  console.log(que)
  return (
    <>
   

      <div className="font-bold text-2xl">{que.category}</div>
      <div className="text-sm">{que.difficulty}</div>
      <div className="font-semibold mt-[64px] text-2xl">{que.question}</div>
      {
            submission === "" ?
            (
                <RadioGroup
                    onChange={(res) => submit(res)}
                >
                    {
                        typeof que.options !== 'undefined' &&
                        que.options.map((option, index) => (
                                <Box key={index} mt="16px">
                                    <Radio value={option}>{option}</Radio>
                                </Box>
                            )
                        )
                    }
                </RadioGroup>
            ) : (
                <RadioGroup
                    value={submission}
                >
                    {
                        typeof que.options !== 'undefined' &&
                        que.options.map((option, index) => (
                                <Box key={index} mt="16px">
                                    <Radio value={option}>{option}</Radio>
                                </Box>
                            )
                        )
                    }
                </RadioGroup>
            )
        }
    </>
  );
};

export default QuestionComponent;

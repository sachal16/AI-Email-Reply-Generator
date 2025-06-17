package com.email.writer.app;

import org.springframework.stereotype.Service;

@Service
public class EmailGeneratorService {
    public String generateEmailReply(EmailRequest emailRequest) {
        //Build the prompt
        String prompt = buildPrompt(emailRequest);
        //Craft a request to the LLM
        //Do a request and get response
        //Return Response
    }
    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line ");
        return null;
    }
}

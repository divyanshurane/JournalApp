package com.spring.journalApp.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection ="journal_entries")
@Data
@Getter
@Setter
@ToString
public class JournalEntry {
    @Id
    private ObjectId id;
    private String title;
    private LocalDateTime date;
    private String content;


    @JsonProperty("id")
    public String getHexId() {
        return id != null ? id.toHexString() : null;
    }
}

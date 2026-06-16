package com.leafnote.openbook.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity // Marks this class as a persistent entity
@Table(name = "bookmark") // Specifies the table name
public class Bookmark extends AbstractAudit {

    @Id // Denotes the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configures ID generation
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "page_id", nullable = true)
    private Page page;

    @OneToOne
    @JoinColumn(name = "line_id", nullable = true)
    private Line line;

}
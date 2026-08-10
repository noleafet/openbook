package com.leafnote.openbook.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity // Marks this class as a persistent entity
@Table(name = "line") // Specifies the table name
public class Line extends AbstractAudit {

    @Id // Denotes the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configures ID generation
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "page_id", nullable = true)
    private Page page;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "line_id", nullable = true)
    private Line line;

    @NotBlank
    @Column(unique = true)
    @Size(min = 1, max = 255)
    private String content;

    @OneToMany(mappedBy = "line", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("content ASC")
    private List<Line> lines = new ArrayList<>();

}
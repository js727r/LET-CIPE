package com.ssafy.letcipe.domain.comment;

import com.ssafy.letcipe.domain.board.Board;
import com.ssafy.letcipe.domain.type.StatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByStatusTypeAndBoardTypeAndBoardId(StatusType statusType, BoardType boardType, Long boardId,  Pageable pageable);


    Optional<Comment> findByStatusTypeAndId(StatusType n, Long commentId);

    @Modifying
    @Query("UPDATE Comment c SET c.statusType = :statusType WHERE c.boardId = :boardId And c.boardType = :boardType")
    int updateStatusType(@Param("statusType") StatusType statusType, @Param("boardId") Long boardId, @Param("boardType") BoardType boardType);

    List<Comment> findByStatusTypeAndBoardTypeAndBoardId(StatusType statusType, BoardType boardType, Long boardId);

    List<Comment> findAllByUserIdAndBoardTypeAndStatusType(Pageable pageable, Long userId, BoardType boardType, StatusType statusType);

    Long countByUserIdAndBoardTypeAndStatusType(Long userId, BoardType boardType, StatusType statusType);
}

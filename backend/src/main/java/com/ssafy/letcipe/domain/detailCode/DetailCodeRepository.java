package com.ssafy.letcipe.domain.detailCode;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailCodeRepository extends JpaRepository<DetailCode, String> {
}
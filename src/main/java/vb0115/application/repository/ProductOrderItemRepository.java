package vb0115.application.repository;

import vb0115.application.domain.ProductOrderItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductOrderItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductOrderItemRepository extends JpaRepository<ProductOrderItem, Long> {

}

package vb0115.application.service;

import vb0115.application.domain.ProductOrderItem;
import vb0115.application.repository.ProductOrderItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing ProductOrderItem.
 */
@Service
@Transactional
public class ProductOrderItemService {

    private final Logger log = LoggerFactory.getLogger(ProductOrderItemService.class);

    private final ProductOrderItemRepository productOrderItemRepository;

    public ProductOrderItemService(ProductOrderItemRepository productOrderItemRepository) {
        this.productOrderItemRepository = productOrderItemRepository;
    }

    /**
     * Save a productOrderItem.
     *
     * @param productOrderItem the entity to save
     * @return the persisted entity
     */
    public ProductOrderItem save(ProductOrderItem productOrderItem) {
        log.debug("Request to save ProductOrderItem : {}", productOrderItem);        return productOrderItemRepository.save(productOrderItem);
    }

    /**
     * Get all the productOrderItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductOrderItem> findAll(Pageable pageable) {
        log.debug("Request to get all ProductOrderItems");
        return productOrderItemRepository.findAll(pageable);
    }


    /**
     * Get one productOrderItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ProductOrderItem> findOne(Long id) {
        log.debug("Request to get ProductOrderItem : {}", id);
        return productOrderItemRepository.findById(id);
    }

    /**
     * Delete the productOrderItem by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductOrderItem : {}", id);
        productOrderItemRepository.deleteById(id);
    }
}

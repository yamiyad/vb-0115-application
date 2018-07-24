package vb0115.application.web.rest;

import vb0115.application.Vb0115ApplicationApp;

import vb0115.application.domain.ProductOrderItem;
import vb0115.application.repository.ProductOrderItemRepository;
import vb0115.application.service.ProductOrderItemService;
import vb0115.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;


import static vb0115.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductOrderItemResource REST controller.
 *
 * @see ProductOrderItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Vb0115ApplicationApp.class)
public class ProductOrderItemResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final BigDecimal DEFAULT_CALCULATED_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_CALCULATED_PRICE = new BigDecimal(1);

    @Autowired
    private ProductOrderItemRepository productOrderItemRepository;

    

    @Autowired
    private ProductOrderItemService productOrderItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductOrderItemMockMvc;

    private ProductOrderItem productOrderItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductOrderItemResource productOrderItemResource = new ProductOrderItemResource(productOrderItemService);
        this.restProductOrderItemMockMvc = MockMvcBuilders.standaloneSetup(productOrderItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductOrderItem createEntity(EntityManager em) {
        ProductOrderItem productOrderItem = new ProductOrderItem()
            .quantity(DEFAULT_QUANTITY)
            .calculatedPrice(DEFAULT_CALCULATED_PRICE);
        return productOrderItem;
    }

    @Before
    public void initTest() {
        productOrderItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductOrderItem() throws Exception {
        int databaseSizeBeforeCreate = productOrderItemRepository.findAll().size();

        // Create the ProductOrderItem
        restProductOrderItemMockMvc.perform(post("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productOrderItem)))
            .andExpect(status().isCreated());

        // Validate the ProductOrderItem in the database
        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProductOrderItem testProductOrderItem = productOrderItemList.get(productOrderItemList.size() - 1);
        assertThat(testProductOrderItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testProductOrderItem.getCalculatedPrice()).isEqualTo(DEFAULT_CALCULATED_PRICE);
    }

    @Test
    @Transactional
    public void createProductOrderItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productOrderItemRepository.findAll().size();

        // Create the ProductOrderItem with an existing ID
        productOrderItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductOrderItemMockMvc.perform(post("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productOrderItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProductOrderItem in the database
        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = productOrderItemRepository.findAll().size();
        // set the field null
        productOrderItem.setQuantity(null);

        // Create the ProductOrderItem, which fails.

        restProductOrderItemMockMvc.perform(post("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productOrderItem)))
            .andExpect(status().isBadRequest());

        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCalculatedPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = productOrderItemRepository.findAll().size();
        // set the field null
        productOrderItem.setCalculatedPrice(null);

        // Create the ProductOrderItem, which fails.

        restProductOrderItemMockMvc.perform(post("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productOrderItem)))
            .andExpect(status().isBadRequest());

        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductOrderItems() throws Exception {
        // Initialize the database
        productOrderItemRepository.saveAndFlush(productOrderItem);

        // Get all the productOrderItemList
        restProductOrderItemMockMvc.perform(get("/api/product-order-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productOrderItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].calculatedPrice").value(hasItem(DEFAULT_CALCULATED_PRICE.intValue())));
    }
    

    @Test
    @Transactional
    public void getProductOrderItem() throws Exception {
        // Initialize the database
        productOrderItemRepository.saveAndFlush(productOrderItem);

        // Get the productOrderItem
        restProductOrderItemMockMvc.perform(get("/api/product-order-items/{id}", productOrderItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productOrderItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.calculatedPrice").value(DEFAULT_CALCULATED_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProductOrderItem() throws Exception {
        // Get the productOrderItem
        restProductOrderItemMockMvc.perform(get("/api/product-order-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductOrderItem() throws Exception {
        // Initialize the database
        productOrderItemService.save(productOrderItem);

        int databaseSizeBeforeUpdate = productOrderItemRepository.findAll().size();

        // Update the productOrderItem
        ProductOrderItem updatedProductOrderItem = productOrderItemRepository.findById(productOrderItem.getId()).get();
        // Disconnect from session so that the updates on updatedProductOrderItem are not directly saved in db
        em.detach(updatedProductOrderItem);
        updatedProductOrderItem
            .quantity(UPDATED_QUANTITY)
            .calculatedPrice(UPDATED_CALCULATED_PRICE);

        restProductOrderItemMockMvc.perform(put("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductOrderItem)))
            .andExpect(status().isOk());

        // Validate the ProductOrderItem in the database
        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeUpdate);
        ProductOrderItem testProductOrderItem = productOrderItemList.get(productOrderItemList.size() - 1);
        assertThat(testProductOrderItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testProductOrderItem.getCalculatedPrice()).isEqualTo(UPDATED_CALCULATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingProductOrderItem() throws Exception {
        int databaseSizeBeforeUpdate = productOrderItemRepository.findAll().size();

        // Create the ProductOrderItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductOrderItemMockMvc.perform(put("/api/product-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productOrderItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProductOrderItem in the database
        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductOrderItem() throws Exception {
        // Initialize the database
        productOrderItemService.save(productOrderItem);

        int databaseSizeBeforeDelete = productOrderItemRepository.findAll().size();

        // Get the productOrderItem
        restProductOrderItemMockMvc.perform(delete("/api/product-order-items/{id}", productOrderItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductOrderItem> productOrderItemList = productOrderItemRepository.findAll();
        assertThat(productOrderItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductOrderItem.class);
        ProductOrderItem productOrderItem1 = new ProductOrderItem();
        productOrderItem1.setId(1L);
        ProductOrderItem productOrderItem2 = new ProductOrderItem();
        productOrderItem2.setId(productOrderItem1.getId());
        assertThat(productOrderItem1).isEqualTo(productOrderItem2);
        productOrderItem2.setId(2L);
        assertThat(productOrderItem1).isNotEqualTo(productOrderItem2);
        productOrderItem1.setId(null);
        assertThat(productOrderItem1).isNotEqualTo(productOrderItem2);
    }
}

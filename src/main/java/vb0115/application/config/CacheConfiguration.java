package vb0115.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(vb0115.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(vb0115.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(vb0115.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductCategory.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductCategory.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Customer.class.getName() + ".orders", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductOrder.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductOrder.class.getName() + ".orderItems", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductOrder.class.getName() + ".invoices", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.ProductOrderItem.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Invoice.class.getName(), jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Invoice.class.getName() + ".shipments", jcacheConfiguration);
            cm.createCache(vb0115.application.domain.Shipment.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
